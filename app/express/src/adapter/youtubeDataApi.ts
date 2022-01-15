import fetch from 'node-fetch';

const { YOUTUBE_API_KEY } = process.env;

type VideoDetails = {
  kind: string;
  etag: string;
  items: [
    {
      kind: string;
      etag: string;
      id: string;
      contentDetails: {
        duration: string; // "PT20M8S" 動画の長さ
        dimension: string;
        definition: string;
        caption: string; // string of boolean
        licensedContent: boolean;
        contentRating: {};
        projection: string;
      };
    }
  ];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export const getVideoDuration = async (videoId: string) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&part=contentDetails&id=${videoId}`
  );

  const result = (await res.json()) as VideoDetails;

  const videoDuration = result.items[0].contentDetails.duration;

  return videoDuration;
};

type VideoInfo = {
  kind: string;
  etag: string;
  items: [
    {
      kind: string;
      etag: string;
      id: string; // videoId
      snippet: {
        publishedAt: string;
        channelId: string;
        title: string; // videoTitle
        description: string; // video description
        thumbnails: {
          default: {
            url: string;
            width: 120;
            height: 90;
          };
          medium: {
            url: string;
            width: 320;
            height: 180;
          };
          high: {
            url: string;
            width: 480;
            height: 360;
          };
          standard: {
            url: string;
            width: 640;
            height: 480;
          };
          maxres: {
            url: string;
            width: 1280;
            height: 720;
          };
        };
        channelTitle: string;
        tags: string[];
        categoryId: string;
        liveBroadcastContent: string;
        localized: {
          title: string;
          description: string;
        };
        defaultAudioLanguage: string;
      };
    }
  ];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export const getVideoTitleAndChannelTitle = async (videoId: string) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&part=snippet&id=${videoId}`
  );

  const result = (await res.json()) as VideoInfo;

  const { title: videoTitle, channelTitle } = result.items[0].snippet;

  return { videoTitle, channelTitle };
};
