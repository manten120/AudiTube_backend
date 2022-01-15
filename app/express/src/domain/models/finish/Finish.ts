// import { User } from '../user/User';
// import { Video } from '../video/Video';

// export class WishList {
//   readonly user: User;

//   videos: ReadonlyArray<{ video: Video; addedAt: Date }>;

//   constructor(user: User, videos: { video: Video; addedAt: Date }[]) {
//     this.user = user;
//     this.videos = videos;
//   }

//   readonly addVideo = (video: Video) => {
//     const addedAt = DateTime.now(); // 現在時刻
//     const newVideos = this.videos.concat({ video, addedAt });
//     this.videos = newVideos
//   };

//   readonly removeVideo = (video: Video) => {
//     const newVideos = this.videos.filter((v) => {
//       if(v.video.equals(video)) {return false};
//       return true;
//     })
//     this.videos = newVideos;
//   };
// }

// // ユーザー
// // video
// // videoを見始めた日
// // videoを見終えた日

// // 感想
// // 感想を書いた日
// // 感想を編集した日
// // 感想へのコメント
