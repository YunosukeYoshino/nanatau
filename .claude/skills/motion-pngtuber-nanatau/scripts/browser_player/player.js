const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const statusEl = document.getElementById("status");
const mouthShapeEl = document.getElementById("mouthShape");
const audioLevelEl = document.getElementById("audioLevel");
const frameIndexEl = document.getElementById("frameIndex");
const chatLogEl = document.getElementById("chatLog");
const chatFormEl = document.getElementById("chatForm");
const chatInputEl = document.getElementById("chatInput");
const sendButtonEl = document.getElementById("sendButton");
const stopAudioButtonEl = document.getElementById("stopAudio");
const ttsAudioEl = document.getElementById("ttsAudio");

const SESSION_KEY = "motionpngtuber-chat-session-id";

const video = document.createElement("video");
video.src = "./loop_mouthless_h264.mp4";
video.loop = true;
video.muted = true;
video.playsInline = true;
video.autoplay = true;
video.preload = "auto";

let track = null;
let mouthSprites = null;
let lastValidFrame = null;
let audioCtx = null;
let analyser = null;
let timeDomain = null;
let audioSourceNode = null;
let audioLevel = 0;
let smoothedLevel = 0;
let isSubmitting = false;
let currentObjectUrl = null;

async function loadJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`JSON load failed: ${url}`);
  }
  return res.json();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function setStatus(text) {
  statusEl.textContent = text;
}

function getSessionId() {
  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }
  const generated =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(SESSION_KEY, generated);
  return generated;
}

function pickFrame(frameIdx) {
  const frame = track.frames[frameIdx];
  if (frame?.valid) {
    lastValidFrame = frame;
    return frame;
  }
  return lastValidFrame ?? track.frames.find((item) => item.valid) ?? track.frames[0];
}

function chooseShape(level, nowMs) {
  if (level < 0.018) return "closed";
  if (level < 0.045) return "half";
  if (level < 0.08) return Math.floor(nowMs / 110) % 2 === 0 ? "e" : "u";
  if (level < 0.13) return Math.floor(nowMs / 90) % 2 === 0 ? "open" : "e";
  return "open";
}

function drawMouth(img, quad) {
  const w = img.naturalWidth || img.width;
  const h = img.naturalHeight || img.height;
  const p0 = quad[0];
  const p1 = quad[1];
  const p3 = quad[3];

  ctx.save();
  ctx.setTransform(
    (p1[0] - p0[0]) / w,
    (p1[1] - p0[1]) / w,
    (p3[0] - p0[0]) / h,
    (p3[1] - p0[1]) / h,
    p0[0],
    p0[1]
  );
  ctx.drawImage(img, 0, 0, w, h);
  ctx.restore();
}

async function ensureAudioGraph() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.55;
    timeDomain = new Uint8Array(analyser.fftSize);
    audioSourceNode = audioCtx.createMediaElementSource(ttsAudioEl);
    audioSourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
}

function updateAudioLevel() {
  if (!analyser || !timeDomain || ttsAudioEl.paused) {
    audioLevel = 0;
    smoothedLevel = Math.max(0, smoothedLevel * 0.92);
    return;
  }

  analyser.getByteTimeDomainData(timeDomain);
  let sum = 0;
  for (let i = 0; i < timeDomain.length; i += 1) {
    const centered = (timeDomain[i] - 128) / 128;
    sum += centered * centered;
  }
  const rms = Math.sqrt(sum / timeDomain.length);
  audioLevel = rms;
  const boosted = Math.max(0, (rms - 0.008) * 3.0);
  smoothedLevel = smoothedLevel * 0.78 + boosted * 0.22;
}

function clearEmptyState() {
  const empty = chatLogEl.querySelector(".chat-empty");
  if (empty) {
    empty.remove();
  }
}

function appendMessage(role, text) {
  clearEmptyState();
  const wrapper = document.createElement("div");
  wrapper.className = `message ${role}`;

  const roleEl = document.createElement("span");
  roleEl.className = "message-role";
  roleEl.textContent =
    role === "user" ? "あなた" : role === "assistant" ? "キャラクター" : "システム";

  const textEl = document.createElement("div");
  textEl.textContent = text;

  wrapper.append(roleEl, textEl);
  chatLogEl.append(wrapper);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
}

function setSubmitting(nextValue) {
  isSubmitting = nextValue;
  sendButtonEl.disabled = nextValue;
  chatInputEl.disabled = nextValue;
}

function base64ToObjectUrl(base64, mimeType) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  return URL.createObjectURL(blob);
}

function stopPlayback() {
  ttsAudioEl.pause();
  ttsAudioEl.currentTime = 0;
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
  ttsAudioEl.removeAttribute("src");
  audioLevel = 0;
  smoothedLevel = 0;
  setStatus("音声停止");
}

async function playAudio(base64, mimeType) {
  await ensureAudioGraph();
  stopPlayback();
  currentObjectUrl = base64ToObjectUrl(base64, mimeType);
  ttsAudioEl.src = currentObjectUrl;
  await ttsAudioEl.play();
  setStatus("再生中");
}

async function sendChatMessage(message) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId: getSessionId(),
      message,
    }),
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch (_error) {
    payload = null;
  }

  if (!res.ok) {
    const errorMessage = payload?.error ?? `サーバー呼び出しに失敗しました (${res.status})`;
    throw new Error(errorMessage);
  }
  return payload;
}

async function handleSubmit(event) {
  event.preventDefault();
  if (isSubmitting) {
    return;
  }

  const message = chatInputEl.value.trim();
  if (!message) {
    setStatus("メッセージを入力してください");
    return;
  }

  appendMessage("user", message);
  chatInputEl.value = "";
  setSubmitting(true);
  stopPlayback();
  setStatus("返信生成中…");

  try {
    const payload = await sendChatMessage(message);
    appendMessage("assistant", payload.assistantText);
    await playAudio(payload.audioBase64, payload.audioMimeType);
  } catch (error) {
    console.error(error);
    const errorText = error instanceof Error ? error.message : "返信生成に失敗しました。";
    appendMessage("system", errorText);
    setStatus(errorText);
  } finally {
    setSubmitting(false);
    chatInputEl.focus();
  }
}

function render(nowMs) {
  requestAnimationFrame(render);
  if (!track || !mouthSprites || video.readyState < 2) {
    return;
  }

  if (video.paused) {
    video.play().catch(() => {});
  }

  updateAudioLevel();

  const frameIdx = Math.floor(video.currentTime * track.fps) % track.frames.length;
  const frame = pickFrame(frameIdx);
  const mouthShape = chooseShape(smoothedLevel, nowMs);
  const sprite = mouthSprites[mouthShape] ?? mouthSprites.closed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  if (frame?.quad && sprite) {
    drawMouth(sprite, frame.quad);
  }

  mouthShapeEl.textContent = mouthShape;
  audioLevelEl.textContent = smoothedLevel.toFixed(3);
  frameIndexEl.textContent = String(frameIdx);
}

async function main() {
  try {
    setStatus("アセット読込中…");
    track = await loadJson("./mouth_track.json");
    const [closed, half, open, u, e] = await Promise.all([
      loadImage("./mouth/closed.png"),
      loadImage("./mouth/half.png"),
      loadImage("./mouth/open.png"),
      loadImage("./mouth/u.png"),
      loadImage("./mouth/e.png"),
    ]);
    mouthSprites = { closed, half, open, u, e };
    canvas.width = track.width;
    canvas.height = track.height;
    await video.play();
    setStatus("準備完了");
    requestAnimationFrame(render);
  } catch (error) {
    console.error(error);
    setStatus("初期化失敗");
  }
}

chatFormEl.addEventListener("submit", handleSubmit);

chatInputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatFormEl.requestSubmit();
  }
});

stopAudioButtonEl.addEventListener("click", () => {
  stopPlayback();
});

ttsAudioEl.addEventListener("ended", () => {
  setStatus("再生完了");
});

main();
