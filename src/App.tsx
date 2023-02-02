import './App.css';
import {
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';

const gender = [
  {
    value: 'man',
    label: '男',
  },
  {
    value: 'woman',
    label: '女',
  }
]

const retirement_age = [
  {
    value: '60',
    label: '60',
  },
  {
    value: '65',
    label: '65',
  },
  {
    value: '70',
    label: '70',
  },
  {
    value: '75',
    label: '75',
  }
]

const data = [
  {
    "name": "0歳",
    "収入": 4000,
    "支出": 2400,
    "貯蓄": 2400
  },
  {
    "name": "10歳",
    "収入": 3000,
    "支出": 1398,
    "貯蓄": 2210
  },
  {
    "name": "20歳",
    "収入": 2000,
    "支出": 9800,
    "貯蓄": 2290
  },
  {
    "name": "30歳",
    "収入": 2780,
    "支出": 3908,
    "貯蓄": 2000
  },
  {
    "name": "40歳",
    "収入": 1890,
    "支出": 4800,
    "貯蓄": 2181
  },
  {
    "name": "50歳",
    "収入": 2390,
    "支出": 3800,
    "貯蓄": 2500
  },
  {
    "name": "60歳",
    "収入": 3490,
    "支出": 4300,
    "貯蓄": 2100
  },
  {
    "name": "70歳",
    "収入": 3490,
    "支出": 4300,
    "貯蓄": 2100
  },
  {
    "name": "80歳",
    "収入": 3490,
    "支出": 4300,
    "貯蓄": 2100
  },
  {
    "name": "90歳",
    "収入": 3490,
    "支出": 4300,
    "貯蓄": 2100
  },
  {
    "name": "100歳",
    "収入": 3490,
    "支出": 4300,
    "貯蓄": 2100
  },
  {
    "name": "100歳",
    "収入": 3490,
    "支出": 4300,
    "貯蓄": 2100
  }
]

function App() {
  return (
    <div>
      <form noValidate autoComplete="off">
        <div>
          <p>入力者</p>
          <div>
            <TextField label="年齢" type="number" />
          </div>
          <div>
            <TextField select label="性別" defaultValue="男" variant="filled">
              {gender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField label="職業" />
          </div>
          <div>
            <TextField label="手取り" type="number" />
          </div>
          <div>
            <TextField select label="定年" defaultValue="60" variant="filled">
              {retirement_age.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField label="貯蓄額" type="number" />
          </div>
        </div>
        <div>
          <p>配偶者</p>
          <div>
            <TextField label="年齢" type="number" />
          </div>
          <div>
            <TextField select label="性別" defaultValue="男" variant="filled">
              {gender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField label="職業" />
          </div>
          <div>
            <TextField label="手取り" type="number" />
          </div>
          <div>
            <TextField select label="定年" defaultValue="60" variant="filled">
              {retirement_age.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField label="貯蓄額" type="number" />
          </div>
        </div>
        <div>
          <p>子供</p>
          <div>
            <FormControl>
              <FormLabel>子供有無</FormLabel>
              <RadioGroup defaultValue="false">
                <FormControlLabel value="true" control={<Radio />} label="有" />
                <FormControlLabel value="false" control={<Radio />} label="無" />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <TextField label="第一子年齢" type="number" />
          </div>
        </div>
        <div>
          <p>住宅</p>
          <ul>
            <div>
              <FormControl>
                <FormLabel>住宅形態</FormLabel>
                <RadioGroup defaultValue="false">
                  <FormControlLabel value="own_house" control={<Radio />} label="持ち家" />
                  <FormControlLabel value="rental" control={<Radio />} label="賃貸" />
                </RadioGroup>
              </FormControl>
            </div>
          <div>
            <TextField label="家賃" type="number" />
          </div>
          <div>
            <FormControl>
              <FormLabel>マイホーム購入</FormLabel>
              <RadioGroup defaultValue="false">
                <FormControlLabel value="true" control={<Radio />} label="購入予定" />
                <FormControlLabel value="false" control={<Radio />} label="購入しない" />
              </RadioGroup>
            </FormControl>
          </div>
            <TextField label="購入するのはn年後" type="number" />
          </ul>
        </div>
        <div>
          <p>セカンドライフ</p>
          <div>
            <TextField label="退職金" type="number" />
          </div>
        </div>
          <li>生活スタイル</li>
        <p>ライフイベント</p>
        <ul>
          <li>車購入</li>
          <li>家のリフォーム</li>
          <li>国内旅行</li>
          <li>海外旅行</li>
          <li>ペット</li>
          <li>介護</li>
          <li>趣味</li>
        </ul>
      </form>
      <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="貯蓄" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="支出" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="収入" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
}

export default App;

// グラフを描画するライブラリの中では、ReactとMaterial UIとの相性が良いものとして以下があります:

// Recharts
// Victory
// Chart.js
// Nivo
// 一番お勧めのライブラリはRechartsです。ReactとMaterial UIとの統合が簡単で、棒グラフや折れ線グラフをはじめとする多様なグラフの種類をサポートしています。また、文書も充実しているため使い方も容易です。