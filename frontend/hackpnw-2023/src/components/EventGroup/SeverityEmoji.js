import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import SentimentNeutralOutlinedIcon from '@mui/icons-material/SentimentNeutralOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';

import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';
import { grey } from '@mui/material/colors';

export const SeverityScale = {
  name: "SeverityScale",
  features: [
    { icon: SentimentVeryDissatisfiedOutlinedIcon, color: red[900] },
    { icon: SentimentDissatisfiedOutlinedIcon, color: red[500] },
    { icon: SentimentNeutralOutlinedIcon, color: grey[500] },
    { icon: SentimentSatisfiedOutlinedIcon, color: green[300] },
    { icon: SentimentVerySatisfiedOutlinedIcon, color: green[[700]] } 
  ]
};