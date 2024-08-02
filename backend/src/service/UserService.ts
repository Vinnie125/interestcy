import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import { Userdata } from '../interface';

const dataPath = './src/user.json';

@Provide()
export class UserService {
  private getData() {
    return JSON.parse(fs.readFileSync('./src/user.json', 'utf-8'));
  }

  private saveData(data: any) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async register(userData: Userdata): Promise<{ success: boolean; message: string }> {
    const { username, passwd } = userData;
    const data = this.getData();

    const existingUser = data.find((user: any) => user.username === username);
    if (existingUser) {
      return { success: false, message: '用户名已存在' };
    }

    
    const newUser = {
      username,
      passwd: passwd,
    };

    data.push(newUser);
    this.saveData(data);

    return { success: true, message: '注册成功' };
  }
  

  async login(userData: Userdata):Promise<{ success: boolean; message: string }> {
    const { username, passwd } = userData;
    const users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        const userFind = users.find(u => u.username === username && u.passwd === passwd);

        if (userFind) {
            return {
                success: true,
                message: '登陆成功'
            };
        } else {
            return {
                success: false,
                message: 'failed'
            };
        }
  }
}
