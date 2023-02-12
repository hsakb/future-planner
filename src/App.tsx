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
      earnings: settings.annual_income - settings.annual_expenditure,
      savings: tmp_savings
    })
  }
  return result
}

const sampleData = [
  {
    id: 0,
    name: '',
    frequency: 1,
    amount: 100,
  },
  {
    id: 1,
    name: '国内旅行',
    frequency: 1,
    amount: 100,
  },
  {
    id: 2,
    name: '海外旅行',
    frequency: 1,
    amount: 100,
  },
  {
    id: 3,
    name: '帰省',
    frequency: 1,
    amount: 100,
  }
]

export const App = () => {

  //   収入（income）
  // 支出（expenditures）
  // 貯蓄（savings）
  // 資産（assets）
  // 負債（liabilities）
  // ネットワース（net worth）
  // 投資収益（investment returns）
  // 税金（taxes）
  // 社会保障（Social Security）
  // ペンション（pension）

  /**
   * グリッドの列定義
   */
  const finance_grid_columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '入力者年齢',
      width: 90,
      type: 'number',
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
      field: 'earnings',
      headerName: '収支',
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

  /**
   * グリッドの列定義
   */
  const regular_expenditure_grid_columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'No',
      width: 90,
      type: 'number',
    },
    {
      field: 'name',
      headerName: '名称',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'frequency',
      headerName: '頻度',
      type: 'number',
      width: 150,
      editable: true,
    },
    {
      field: 'amount',
      headerName: '金額',
      type: 'number',
      width: 150,
      editable: true,
    }
  ];

  /**
   * グリッドの列定義
   */
  const children_grid_columns: GridColDef[] = [
    {
      field: 'id',
      headerName: '名前',
      width: 90,
      type: 'number',
      editable: true,
    },
    {
      field: 'age',
      headerName: '年齢',
      width: 90,
      type: 'number',
      editable: true,
    },
    {
      field: 'KindergartenFee',
      headerName: '保育園学費',
      width: 120,
      type: 'number',
      editable: true,
    },
    {
      field: 'PreschoolFee',
      headerName: '幼稚園学費',
      width: 120,
      type: 'number',
      editable: true,
    },
    {
      field: 'ElementarySchoolFee',
      headerName: '小学校学費',
      width: 120,
      type: 'number',
      editable: true,
    },
    {
      field: 'JuniorHighSchoolFee',
      headerName: '中学校学費',
      width: 120,
      type: 'number',
      editable: true,
    },
    {
      field: 'HighSchoolFee',
      headerName: '高校学費',
      width: 120,
      type: 'number',
      editable: true,
    },
    {
      field: 'UniversityFee',
      headerName: '大学学費',
      width: 120,
      type: 'number',
      editable: true,
    },
    {
      field: 'GraduateSchoolFee',
      headerName: '大学院学費',
      width: 120,
      type: 'number',
      editable: true,
    },
    {
      field: 'TutoringFee',
      headerName: '塾代',
      width: 120,
      type: 'number',
      editable: true,
    },
    {
      field: 'OtherLearningExpense',
      headerName: 'その他学習費',
      width: 120,
      type: 'number',
      editable: true,
    },
  ];


  /**
     * データ表示設定
     */
  const [settings, setSettings] = useState<Settings>({
    age: 25,
    annual_income: 3000000,
    annual_expenditure: 2000000,
    savings: 1000000
  })

  /**
   * データ表示設定変更後にその値を保存する
   * @param e 
   */
  const handleSettingsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: isNaN(parseInt(e.target.value, 10))
        ? e.target.value : parseInt(e.target.value, 10)
    })
  }

  /**
   * 反映ボタン押下時に設定をグリッドとグラフに適用する
   */
  const handleApplySettings = () => {
    setData(generateDataBySettings(settings))
  }

  /**
   * グラフのプロパティ
   */
  const [chartProps, setChartProps] = useState({
    width: 800,
    height: 500,
    interval: 1,
    angle: 0,
  })

  /**
   * グラフのプロパティ変更後にグラフに反映する
   * @param e 
   */
  const handleChartPropsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChartProps({
      ...chartProps,
      [e.target.name]: isNaN(parseInt(e.target.value, 10))
        ? e.target.value : parseInt(e.target.value, 10)
    })
  }

  /**
   * グリッドの行変更後にバインドしているデータを変更
   * @param newRow 
   * @returns 
   */
  const processRowUpdate = (newRow: GridRowModel) => {
    const index = data.indexOf(newRow)
    const newData = [...data]
    newData[index] = newRow
    setData(newData)
    return newRow
  }

  /**
   * グリッドとグラフがバインドする変数
   */
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
          columns={finance_grid_columns}
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
            <Grid item xs={2} px={1}>
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
            <Grid item xs={2} px={1}>
              <p>配偶者</p>
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
            <Grid item xs={2} px={1}>
              <p>金融資産</p>
              <div>
                <TextField fullWidth label="年間積立額" type="number" InputProps={{ inputProps: { min: 0, max: 100 } }} name="investment_yield" onChange={handleSettingsChange} />
              </div>
              <div>
                <TextField fullWidth label="利回り" type="number" InputProps={{ inputProps: { min: 0, max: 100 } }} name="investment_yield" onChange={handleSettingsChange} />
              </div>
            </Grid>
            <Grid item xs={2} px={1}>
              <p>NISA</p>
              <div>
                <TextField fullWidth label="NISA" type="number" InputProps={{ inputProps: { min: 0, max: 100 } }} name="investment_yield" onChange={handleSettingsChange} />
              </div>
              <div>
                <TextField fullWidth label="NISA利回り" type="number" InputProps={{ inputProps: { min: 0, max: 100 } }} name="investment_yield" onChange={handleSettingsChange} />
              </div>
            </Grid>
            <Grid item xs={2} px={1}>
              <p>iDeco</p>
              <div>
                <TextField fullWidth label="iDeco積立額" type="number" name="defined_contribution_pension" onChange={handleSettingsChange} />
              </div>
              <div>
                <TextField fullWidth label="iDeco利回り" type="number" InputProps={{ inputProps: { min: 0, max: 100 } }} name="investment_yield" onChange={handleSettingsChange} />
              </div>
            </Grid>
            <Grid item xs={2} px={1}>
              <p>住宅</p>
              <div>
                <TextField fullWidth label="家賃" type="number" />
              </div>
              <div>
                <TextField fullWidth label="ローン" type="number" />
              </div>
            </Grid>
            <Grid item xs={10} px={1}>
              <p>定期支出</p>
              < Box sx={{ height: 300, width: '100%' }}>
                <DataGrid
                  rows={sampleData}
                  rowHeight={25}
                  columns={regular_expenditure_grid_columns}
                  pageSize={50}
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  disableSelectionOnClick
                  processRowUpdate={processRowUpdate}
                  // onProcessRowUpdateError={handleProcessRowUpdateError}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </Grid>
            <Grid item xs={2} px={1}>
              <div>
                <p>セカンドライフ</p>
                <div>
                  <TextField fullWidth label="退職金" type="number" />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} px={1}>
              <div>
                <p>子供</p>
                < Box sx={{ height: 300, width: '100%' }}>
                  <DataGrid
                    rows={data}
                    rowHeight={25}
                    columns={children_grid_columns}
                    pageSize={50}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    disableSelectionOnClick
                    processRowUpdate={processRowUpdate}
                    // onProcessRowUpdateError={handleProcessRowUpdateError}
                    experimentalFeatures={{ newEditingApi: true }}
                  />
                </Box>
              </div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
}

export default App