import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import { POST } from '../interface';

const dataPath =  './src/post.json';

@Provide()
export class PostService {
  private getData() {
    return JSON.parse(fs.readFileSync('./src/post.json', 'utf-8'));
  }

  private saveData(data: any) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async createPost(groupInfo: POST): Promise<{ success: boolean; message: string }> {
    const data = this.getData();
    const newGroup = {
      name: groupInfo.name,
      content: groupInfo.content,
      url: groupInfo.url
    };

    data.push(newGroup);
    this.saveData(data);

    return  { success: true, message: '创建成功' };
  }

  async getMyPost(): Promise<{ success: boolean; groups: POST[] }> {
    const data = this.getData();
    return { success: true, groups: data };
  }
}
