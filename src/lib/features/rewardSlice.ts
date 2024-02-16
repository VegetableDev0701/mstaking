import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IReward } from '@/interface/Reward'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export interface rewardState {
  rewards: {
    [keyName: string]: IReward[]
  }
}
interface chartDataset {
  label: string,
  data: number[],
  fill: boolean,
  backgroundColor: string,
  borderColor: string,
  pointBackgroundColor: string,
  tension: number,
  borderWidth: number,
  pointBorderWidth: number,
  pointRadius: number,
  cAddress: string
}
const initialRewardState: rewardState = {
  rewards: {},
}

export const rewardSlice = createSlice({
  name: 'reward',
  initialState: initialRewardState,
  reducers: {
    setAllRewards: (state, action) => {
      state.rewards = action.payload
    },
    addRewards: (state, action: PayloadAction<{ data: IReward }>) => {
      const data: IReward = action.payload.data
      state.rewards[data.Caddress].push(data)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setAllRewards,
  addRewards } = rewardSlice.actions
export const getRewards = (state: any) => state.rewards.rewards;
export const getTotalRewards = (state: any) => {
  const rewards = state.rewards.rewards
  let keys = Object.keys(rewards)
  let total = 0
  for(let i =0; i<keys.length; i++) {
    const rews = rewards[keys[i]]
    for(let j =0; j<rews.length; j++) {
      total = total + rews[j].RewardAmount
    }
  }
  return total
}
export const getRewardData = (state: any) => {
  let datasets: chartDataset[] = []
  const rewards = state.rewards.rewards
  const cols = state.collection.cols
  let labels: string[] = []
  let keys = Object.keys(rewards)
  for (let i = 0; i < keys.length; i++) {
    const colInd = cols.findIndex((el: any) => el.Caddress == keys[i])
    if ( colInd == -1) continue
    datasets.push({
      cAddress: cols[colInd].Caddress,
      label: cols[colInd].Ctitle,
      data: [],
      fill: true,
      backgroundColor: "transparent",
      borderColor: "#ffff",
      pointBackgroundColor: "#fff",
      tension: 0.4,
      borderWidth: 4,
      pointBorderWidth: 6,
      pointRadius: 3,
    })
    for (let j = 0; j < rewards[keys[i]].length; j++) {
      const idx = labels.findIndex((el: string) => el == rewards[keys[i]][j].RewardDate)
      if (idx == -1) {
        labels.push(rewards[keys[i]][j].RewardDate)
      }
    }
  }
  labels = labels.sort((a, b) => new Date(a) > new Date(b) ? 1 : 0)
  for (let i = 0; i < labels.length; i++) {
    for(let j =0;j<keys.length; j++) {
      const rewardInd = rewards[keys[j]].findIndex((el: IReward) => el.RewardDate == labels[i])
      if (rewardInd == -1) {
        const dataInd = datasets.findIndex((el: chartDataset) => el.cAddress == keys[j])
        if (dataInd != -1) {
          datasets[dataInd].data.push(0)
        }
      } else {
        const dataInd = datasets.findIndex((el: chartDataset) => el.cAddress == keys[j])
        if (dataInd != -1) {
          datasets[dataInd].data.push(rewards[keys[j]][rewardInd].RewardAmount)
        }
      }
    }
  }
  return { labels, datasets }
}

const rewardPersistConfig = {
  key: "reward",
  storage: storage,
  whitelist: ["rewards"],
};
export default persistReducer(rewardPersistConfig, rewardSlice.reducer)