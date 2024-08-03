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

  async getComments(postId: number) {
    const comments = this.getCommentsData();
    const postComments = comments.find(c => c.postId === postId);
    return postComments ? postComments.comments : [];
  }

  getCommentsData() {
    return JSON.parse(fs.readFileSync('./src/comment.json', 'utf-8'));
  }

  saveCommentsData(data: any) {
    fs.writeFileSync(commentFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
