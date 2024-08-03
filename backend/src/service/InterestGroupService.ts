import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import { Circle } from '../interface';

const dataPath =  './src/cycle.json';

@Provide()
export class InterestGroupService {
  private getData() {
    return JSON.parse(fs.readFileSync('./src/cycle.json', 'utf-8'));
  }

  private saveData(data: any) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async createGroup(groupInfo: Circle): Promise<{ success: boolean; message: string }> {
    const data = this.getData();
    const newGroup = {
      id: groupInfo.id,
      name: groupInfo.name,
      description: groupInfo.description,
      location: groupInfo.location,
      members: 1
    };

    data.push(newGroup);
    this.saveData(data);

    return  { success: true, message: '创建成功' };
  }

  async getMyGroups(): Promise<{ success: boolean; groups: Circle[] }> {
    const data = this.getData();
    return { success: true, groups: data };
  }
}