import './App.css';
import {
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Box,
  Grid,
  Button,
} from '@mui/material';
import { Area, Bar, CartesianGrid, ComposedChart, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { ChangeEvent, useState } from 'react';
import { DataGrid, GridColDef, GridRowModel, GridValidRowModel, MuiEvent } from '@mui/x-data-grid';

export const generateGridData = (
  age: number,
  annual_income: number,
  savings: number
): GridValidRowModel[] => {
  const result: GridValidRowModel[] = []
  let id = age
  let calc_annual_income = annual_income
  let calc_spending = 2000000
  let calc_savings = savings
  result.push({
    id: id,
    annual_income: calc_annual_income,
    spending: calc_spending,
    savings: calc_savings + calc_annual_income - calc_spending
  })
  for (let i = age + 1; i <= 100; i++) {
    id = i
    calc_annual_income = calc_annual_income * (1 + 0.05)
    calc_spending = calc_spending * (1 + 0.05)
    calc_savings += calc_annual_income - calc_spending
    result.push({
      id: id,
      annual_income: calc_annual_income,
      spending: calc_spending,
      savings: calc_savings
    })
  }
  return result
}

/**
 * データ生成の設定
 */
interface Settings {
  age: number,
  annual_income: number,
  annual_expenditure: number,
  savings: number
}
  

/**
 * 設定からデータを生成する
 * @param settings 
 * @returns 
 */
export const generateDataBySettings = (settings: Settings): GridValidRowModel[] => {
  const result: GridValidRowModel[] = []
  let tmp_savings = settings.savings
  for (let i = settings.age; i <= 100; i++) {
    tmp_savings += (settings.annual_income - settings.annual_expenditure)
    result.push({
      id: i,
      annual_income: settings.annual_income,
      annual_expenditure: settings.annual_expenditure,
      savings: tmp_savings
    })
  }
  console.log(result)
  return result
}

export const App = () => {
  /**
     * データ表示設定
     */
  const [settings, setSettings] = useState<Settings>({
    age: 0,
    annual_income: 0,
    annual_expenditure: 0,
    savings: 0
  })
  /**
   * 設定をグリッドとグラフに適用する
   */
  const handleApplySettings = () => {
    setData(generateDataBySettings(settings))
  }
  const [chartProps, setChartProps] = useState({
    width: 800,
    height: 500,
    interval: 1,
    angle: 0,
  })
  const handleChartPropsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChartProps({
      ...chartProps,
      [e.target.name]: isNaN(parseInt(e.target.value, 10))
        ? e.target.value : parseInt(e.target.value, 10)
    })
  }

  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: isNaN(parseInt(e.target.value, 10))
        ? e.target.value : parseInt(e.target.value, 10)
    })
  }
  // const handleChartDataPropsChange = (e : ChangeEvent<HTMLInputElement>) => {
  //   setChartDataProps({
  //     ...chartDataProps,
  //     [e.target.name]: isNaN(parseInt(e.target.value, 10)) 
  //       ? e.target.value: parseInt(e.target.value, 10)
  //   })
  // }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '年齢',
      width: 90,
      type: 'number',
      editable: true,
    },
    {
      field: 'annual_income',
      headerName: '手取り',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'annual_expenditure',
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

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    const index = data.indexOf(oldRow)
    const newData = [...data]
    newData[index] = newRow
    setData(newData)
    return newRow
  }

  const [data, setData] = useState<GridValidRowModel[]>([])

  return (
    <div>
      <TextField fullWidth label="interval" name="interval" type="number" onChange={handleChartPropsChange} />
      <TextField fullWidth label="angle" name="angle" type="number" onChange={handleChartPropsChange} />
      <ComposedChart width={chartProps.width} height={chartProps.height} data={data}>
        <XAxis dataKey="id" interval={chartProps.interval} angle={chartProps.angle} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="savings" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="annual_expenditure" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="annual_income" stroke="#ff7300" />
      </ComposedChart>
      < Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          rowHeight={25}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[10, 25, 50, 100]}
          disableSelectionOnClick
          processRowUpdate={processRowUpdate}
          // onProcessRowUpdateError={handleProcessRowUpdateError}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <Box m={2}>
        <Button variant="contained" onClick={handleApplySettings}>設定を反映</Button>
      </Box>
      <Box>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={3} px={1}>
              <p>入力者</p>
              <div>
                <TextField fullWidth label="年齢" type="number" name="age" onChange={handleSettingsChange} />
              </div>
              <div>
                <TextField fullWidth label="手取り" type="number" name="annual_income" onChange={handleSettingsChange} />
              </div>
              <div>
                <TextField fullWidth label="貯蓄額" type="number" name="savings" onChange={handleSettingsChange} />
              </div>
            </Grid>
            <Grid item xs={3} px={1}>
              <div>
                <p>配偶者</p>
                <div>
                  <TextField fullWidth label="年齢" type="number" />
                </div>
                <div>
                  <TextField fullWidth label="職業" />
                </div>
                <div>
                  <TextField fullWidth label="手取り" type="number" />
                </div>
                <div>
                  <TextField fullWidth label="貯蓄額" type="number" />
                </div>
              </div>
            </Grid>
            <Grid item xs={3} px={1}>
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
                  <TextField fullWidth label="第一子年齢" type="number" />
                </div>
              </div>
            </Grid>
            <Grid item xs={3} px={1}>
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
                    <TextField fullWidth label="家賃" type="number" />
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
                  <TextField fullWidth label="購入するのはn年後" type="number" />
                </ul>
              </div>
            </Grid>
            <Grid item xs={3} px={1}>
              <div>
                <p>セカンドライフ</p>
                <div>
                  <TextField fullWidth label="退職金" type="number" />
                </div>
              </div>
            </Grid>
            <Grid item xs={3} px={1}>
              <div>
                <p>ライフイベント</p>
                <div>
                  <TextField fullWidth label="年間支出" name="annual_expenditure" type="number" onChange={handleSettingsChange} />
                </div>
                <ul>
                  <li>車購入</li>
                  <li>家のリフォーム</li>
                  <li>国内旅行</li>
                  <li>海外旅行</li>
                  <li>ペット</li>
                  <li>介護</li>
                  <li>趣味</li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default App