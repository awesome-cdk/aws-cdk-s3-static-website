_Note: This is based on the (now deprecated) AWS CDK v1. Some small adapting to v2 is needed. Open to contributions._

# AWS CDK - Static website on S3 and CloudFront

An example on how to deploy a static website (HTML, CSS, JS) into a private S3 bucket that is only accessible through a public CloudFront distribution.

### Getting started:
1. Clone
2. Put your website inside the ./lib/dist folder
3. `npx cdk deploy`
4. Enjoy

### Requirements:
* Valid AWS credentials configured in the terminal where you are deploying.
* NodeJS and NPM
