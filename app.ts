#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {AwsCdkS3StaticWebsiteStack} from "./lib/aws-cdk-s3-static-website-stack";

const app = new cdk.App();
new AwsCdkS3StaticWebsiteStack(app, 'AwsCdkS3StaticWebsiteStack');
