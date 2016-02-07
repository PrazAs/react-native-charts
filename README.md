# react-native-charts
Configurable, animated react-native charting library– (right now just bar charts). 

![screen shot 2015-09-02 at 7 23 31 pm](https://cloud.githubusercontent.com/assets/1638987/9647197/8ec828e0-51a8-11e5-8257-35986fa76bf5.png)
  

### Example
```javascript
import { BarChart } from 'react-native-charts'

<BarChart
  dataSets={[
    { 
      fillColor: '#46b3f7', 
      data: [
        { value: 15 },
        { value: 10 },
        { value: 12 },
        { value: 11 },
      ]
    },
    { 
      fillColor: '#3386b9', 
      data: [
        { value: 14 },
        { value: 11 },
        { value: 14 },
        { value: 13 },
      ]
    },
  ]}
  graduation={1}
  horizontal={false}
  showGrid={true}
  barSpacing={5}
  style={{
    height: 300,
    margin: 15,
  }}/>
```

### TODO
- [ ] Render labels for BarChart data
- [ ] Other chart types including line graphs because they are awesome `¯\_(ツ)_/¯`

Pull requests welcome!
