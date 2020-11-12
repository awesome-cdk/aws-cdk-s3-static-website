import * as cdk from '@aws-cdk/core';
import {RemovalPolicy} from '@aws-cdk/core';
import {Bucket, BucketAccessControl} from "@aws-cdk/aws-s3";
import {BucketDeployment, Source} from "@aws-cdk/aws-s3-deployment";
import * as path from "path";
import {Distribution, OriginAccessIdentity} from "@aws-cdk/aws-cloudfront";
import {S3Origin} from "@aws-cdk/aws-cloudfront-origins";

export class AwsCdkS3StaticWebsiteStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const bucket = new Bucket(this, 'Bucket', {
            removalPolicy: RemovalPolicy.DESTROY,
            accessControl: BucketAccessControl.PRIVATE,
        });

        new BucketDeployment(this, 'BucketDeployment', {
            destinationBucket: bucket,
            sources: [Source.asset(path.resolve(__dirname, './dist'))]
        })

        // Create a CloudFront "identity"
        const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');

        // Give it permissions to read from the private S3 bucket
        bucket.grantRead(originAccessIdentity);

        // Create the CloudFront distribution
        // This will be the only public entrypoint to the files from the S3 bucket
        new Distribution(this, 'Distribution', {
            defaultRootObject: 'index.html',
            defaultBehavior: {
                origin: new S3Origin(bucket, {originAccessIdentity}),
            },
        })
    }
}
