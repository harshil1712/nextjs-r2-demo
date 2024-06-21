An example repo demonstrating image uploading to [R2](https://developers.cloudflare.com/r2/).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`c3`](https://developers.cloudflare.com/pages/get-started/c3).

## Getting Started

### Clone the repository

Clone the repo on your local machine running the following command:

```bash
git clone https://github.com/harshil1712/nextjs-r2-demo.git
```

### Install dependencies

Run the following command to install the required dependencies:

```bash
npm run install
```

### Access R2

If you don't have access to R2, purchase it from your Cloudflare Dashboard.

Create a new bucket. Follow the documentation to learn how to [create a new bucket](https://developers.cloudflare.com/r2/get-started/#2-create-a-bucket).

### Get credentials

To access objects from your R2 bucket, you will need the Account ID, Access Key ID, and Secret Access Key. Follow the [steps mentioned in the documentation](https://developers.cloudflare.com/r2/api/s3/tokens/) to generate the required credentials.

### Setup credentials

Rename `.env.copy` to `.env.local`. Paste the credentials you got in the previous step.

### Configure CORS

You will need to configure the CORS policies to be able to access the objects. Use the CORS policy available in the `cors.json` file.

> __Note:__ You might have to update `AllowedOrigins`.

You add this CORS policy to your bucket via the Dashboard. You can find the steps to do that in [the documentation](https://developers.cloudflare.com/r2/buckets/cors/#add-cors-policies-from-the-dashboard).

### Run development server 
Execute the following command to run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloudflare integration

Besides the `dev` script mentioned above `c3` has added a few extra scripts that allow you to integrate the application with the [Cloudflare Pages](https://pages.cloudflare.com/) environment, these are:
  - `pages:build` to build the application for Pages using the [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) CLI
  - `preview` to locally preview your Pages application using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI
  - `deploy` to deploy your Pages application using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI

> __Note:__ while the `dev` script is optimal for local development you should preview your Pages application as well (periodically or before deployments) in order to make sure that it can properly work in the Pages environment (for more details see the [`@cloudflare/next-on-pages` recommended workflow](https://github.com/cloudflare/next-on-pages/blob/05b6256/internal-packages/next-dev/README.md#recommended-workflow))

### Bindings

Cloudflare [Bindings](https://developers.cloudflare.com/pages/functions/bindings/) are what allows you to interact with resources available in the Cloudflare Platform.

You can use bindings during development, when previewing locally your application and of course in the deployed application:

- To use bindings in dev mode you need to define them in the `next.config.js` file under `setupDevBindings`, this mode uses the `next-dev` `@cloudflare/next-on-pages` submodule. For more details see its [documentation](https://github.com/cloudflare/next-on-pages/blob/05b6256/internal-packages/next-dev/README.md).

- To use bindings in the preview mode you need to add them to the `pages:preview` script accordingly to the `wrangler pages dev` command. For more details see its [documentation](https://developers.cloudflare.com/workers/wrangler/commands/#dev-1) or the [Pages Bindings documentation](https://developers.cloudflare.com/pages/functions/bindings/).

- To use bindings in the deployed application you will need to configure them in the Cloudflare [dashboard](https://dash.cloudflare.com/). For more details see the  [Pages Bindings documentation](https://developers.cloudflare.com/pages/functions/bindings/).