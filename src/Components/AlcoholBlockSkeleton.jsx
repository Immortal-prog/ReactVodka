import React from 'react';
import ContentLoader from 'react-content-loader';

const AlcoholBlockSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={315}
    height={519}
    viewBox="0 0 315 519"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="13" y="268" rx="4" ry="4" width="238" height="26" />
    <rect x="11" y="306" rx="6" ry="6" width="246" height="84" />
    <rect x="5" y="420" rx="13" ry="13" width="93" height="28" />
    <rect x="110" y="400" rx="20" ry="20" width="156" height="60" />
    <circle cx="130" cy="130" r="130" />
  </ContentLoader>
);

export default AlcoholBlockSkeleton;
