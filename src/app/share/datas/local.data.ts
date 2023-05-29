import { Account } from '../models/account.model';
import { main } from '../models/local.model';
import { partLocal } from '../models/local.model';

export var mainData: main = {
  editMode: false,
  reportNumber: '',
  mainId: 0,
  loading: false,
  surveyorSign: false,
};

export var partsData: partLocal[] = [];

export var accounts: Account[] = [
  {
    id: 1,
    name: 'Phạm Văn Chung',
    accountName: 'phamvanchung',
    password: '123456',
  },
  {
    id: 2,
    name: 'Phạm Văn Thịnh',
    accountName: 'phamvanthinh',
    password: '123456',
  },
  {
    id: 3,
    name: 'Nguyễn Văn Luyện',
    accountName: 'nguyenvanluyen',
    password: '123456',
  },
  {
    id: 4,
    name: 'Bùi Việt Anh',
    accountName: 'buivietanh',
    password: '123456',
  },
];
