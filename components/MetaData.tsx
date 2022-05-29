import React from 'react';
import Head from 'next/head';

export type MetaDataPropsType = {
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImage?: string;
  ogImageAlt?: string;
};

export const MetaData = (props: MetaDataPropsType) => (
  <Head>
    {props.metaTitle && <title>{props.metaTitle}</title>}
    {props.metaDescription && <meta name="description" content={props.metaDescription} />}
    {props.ogTitle && <meta property="og:title" content={props.ogTitle} />}
    {props.ogDescription && <meta property="og:description" content={props.ogDescription} />}
    <meta property="og:type" content="website" />
    {props.ogImage && <meta property="og:image" content={props.ogImage} />}
    {props.ogImageWidth && <meta property="og:image:width" content={props.ogImageWidth.toString()} />}
    {props.ogImageHeight && <meta property="og:image:height" content={props.ogImageHeight.toString()} />}
    {props.ogImageAlt && <meta property="og:image:alt" content={props.ogImageAlt} />}
  </Head>
);

export const pickCmsSeoData = (page: any): MetaDataPropsType => ({
  ...page,
  ogImage: page?.ogImage?.url
})
