import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
const commentFilePath ='./src/comment.json';

@Provide()
export class CommentService {
  async addComment(groupId:number,postId: number, comment: { content: string }) {
    const comments = this.getCommentsData();
    const postComments = comments.find(c => c.postId === postId);
    if (postComments) {
      postComments.comments.push(comment);
    } else {
      comments.push({ postId, comments: [comment] });
    }
    this.saveCommentsData(comments);
    return comments;
  }

  async getComments(groupId: number) {
    const comments = this.getCommentsData();
    const groupComments = comments.filter(c => c.groupId === groupId);
    return groupComments.map(gc => gc.comments).flat();
  }

  getCommentsData() {
    return JSON.parse(fs.readFileSync('./src/comment.json', 'utf-8'));
  }

  saveCommentsData(data: any) {
    fs.writeFileSync(commentFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }
  async getUserActivity() {
    const postFilePath = './src/post.json';
    const posts = JSON.parse(fs.readFileSync(postFilePath, 'utf-8'));
    const userActivity = {};

    for (const post of posts) {
      if (!userActivity[post.name]) {
        userActivity[post.name] = 0;
      }
      userActivity[post.name]++;
    }

    return Object.keys(userActivity).map(name => ({
      name,
      postCount: userActivity[name],
    }));
  }
}
