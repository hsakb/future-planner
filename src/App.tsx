import './App.css';
import {
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Box,
} from '@mui/material';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import internal from 'stream';
import { ChangeEvent, useState } from 'react';
import { setConstantValue } from 'typescript';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

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

interface ChartData {
  age: number,
  annual_income: number,
  spending: number,
  savings: number
}
  
const App = () => {

  const generateChartData = () => {
    const result: Array<ChartData> = []
    let savings = 0
    let spending = 4000000
    let annual_income = chartDataProps.salary * (1 + 0.05)
    for (let i = chartDataProps.age; i <= 100; i++) {
      // 年齢を2ずつ加算
      const age = i;
      // 年収を3%ずつ上昇させる
      annual_income = annual_income * (1 + 0.05)
      // 年間の支出額を2%ずつ増加
      spending = spending * (1 + 0.05);
      // 貯蓄額 = 前回の貯蓄額 + （手取り額 - 支出額）
      savings += annual_income - spending;
      // 生成した情報を配列に格納
      result.push({ age, annual_income, spending, savings });
    }
    return result;
  }

  const [chartProps, setChartProps] = useState({
    width: 800,
    height: 500,
    interval: 1,
    angle: 0,
  })
  const [chartDataProps, setChartDataProps] = useState({
    age: 20,
    gender: "man",
    job: "会社員",
    salary: 4000000,
    retirementAge: 65,
    savings: 1000000,
  })
  const [chartData, setChartData] = useState(generateChartData)
  
  const handleChartPropsChange = (e : ChangeEvent<HTMLInputElement>) => {
    setChartProps({
      ...chartProps,
      [e.target.name]: isNaN(parseInt(e.target.value, 10)) 
        ? e.target.value: parseInt(e.target.value, 10)
    })
  }
  const handleChartDataPropsChange = (e : ChangeEvent<HTMLInputElement>) => {
    setChartDataProps({
      ...chartDataProps,
      [e.target.name]: isNaN(parseInt(e.target.value, 10)) 
        ? e.target.value: parseInt(e.target.value, 10)
    })
    setChartData(generateChartData)
  }

  const columns: GridColDef[] = [
    { field: 'age', headerName: '年齢', width: 90, type: 'number'},
    {
      field: 'annual_income',
      headerName: '手取り',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'spending',
      headerName: '支出',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'savings',
      headerName: '貯蓄',
      type: 'number',
      width: 110,
      editable: true,
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <div>
      <TextField label="interval" name="interval" type="number" onChange={handleChartPropsChange} />
      <TextField label="angle" name="angle" type="number" onChange={handleChartPropsChange}/>
      <ComposedChart width={chartProps.width} height={chartProps.height} data={chartData}>
        <XAxis dataKey="age" interval={chartProps.interval} angle={chartProps.angle} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="savings" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="spending" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="annual_income" stroke="#ff7300" />
      </ComposedChart>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <form noValidate autoComplete="off">
        <div>
          <p>入力者</p>
          <div>
            <TextField label="年齢" type="number" name="age" onChange={handleChartDataPropsChange}/>
          </div>
          <div>
            <TextField label="手取り1" type="number" name="annual_income_1" />
          </div>
          <div>
            <TextField label="手取り1はあと何年" type="number" name="annual_income_1_term" onChange={handleChartDataPropsChange}/>
          </div>
          <div>
            <TextField label="手取り2" type="number" name="annual_income_2" />
          </div>
          <div>
            <TextField label="手取り2はあと何年" type="number" name="annual_inome_2_term" onChange={handleChartDataPropsChange}/>
          </div>
          <div>
            <TextField label="手取り3" type="number" name="annual_income_3" />
          </div>
          <div>
            <TextField label="手取り3はあと何年" type="number" name="annual_income_3_term" onChange={handleChartDataPropsChange}/>
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
    </div>
  );
}

export default App;