type AssetBinding = {
  fetch: (request: Request) => Promise<Response>;
};

type Environment = {
  ASSETS: AssetBinding;
};

const canonicalHost = "nanatau.com";
const wwwHost = "www.nanatau.com";

export default {
  async fetch(request: Request, environment: Environment): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === wwwHost) {
      url.hostname = canonicalHost;
      url.protocol = "https:";
      return Response.redirect(url, 301);
    }

    return environment.ASSETS.fetch(request);
  },
};
