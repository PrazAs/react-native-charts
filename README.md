# react-native-charts
Configurable, animated react-native charting library– (right now just bar charts).   

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
- [ ] Other chart types `¯\_(ツ)_/¯`

Pull requests welcome!
