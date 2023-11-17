import { FC } from 'react';
import Button from '../components/button';
import Stack from '../components/stack';
import Grid from '../components/grid';
import Card from '../components/card';
import DegenHoursPFP from '../assets/pfp/degenhours.png';
import FrogtoberPFP from '../assets/pfp/frogtober.png';
import LegendsPFP from '../assets/pfp/legends.png';

export const Portals: FC<{}> = () => {

  return (
    <>

      <Stack direction='VERTICAL' localStyles={{marginTop: 86, marginBottom: 94, '@media (min-width: 1080px)': { marginBottom: 50,}}}>

          {/* Portal Tiles */}
          <Grid
            columns={1}
            localStyles={{
              padding: 'var(--scale-24)',
              gap: 'var(--scale-24)',
              gridTemplateColumns: '1fr',
              '@media (min-width: 600px)' :{
                padding: 'var(--scale-48)',
                gap: 'var(--scale-48)',
              },
              '@media (min-width: 800px)' :{
                gridTemplateColumns: '1fr 1fr',
              },
              '@media (min-width: 1200px)' :{
                gridTemplateColumns: '1fr',
              },
            }}>
            <Card heading="Degen Hours" description='Untransferrable & Secure' pfp={DegenHoursPFP} direction="HORIZONTAL">
              <Button as="a" size='M' variant='SECONDARY' href='https://hub.auraexchange.org/collection/ethereum/0x577c0379ba192c3293f207b40327f34d18f9e7e3' target="_blank">View Collection</Button>
              <Button as="a" size='M' variant="PRIMARY" href='https://degen.pepeapeyachtclub.com' target="_blank">Select Portal</Button>
            </Card>
            <Card heading="Frogtober" description='Your chance to Pull a Rare' pfp={FrogtoberPFP} direction="HORIZONTAL">
              <Button as="a" size='M' variant='SECONDARY' href='https://hub.auraexchange.org/collection/ethereum/0xea3a82c8fdd0f7e7fd36a58900ff9aa39995c9ce' target="_blank">View Collection</Button>
              <Button as="a" size='M' variant="PRIMARY" href='https://frogtober.pepeapeyachtclub.com' target="_blank">Select Portal</Button>
            </Card>
            <Card heading="Legends" description='Past &amp; Present Icons' pfp={LegendsPFP} direction="HORIZONTAL">
              <Button as="a" size='M' variant='SECONDARY' href='https://hub.auraexchange.org/collection/ethereum/0x0f4186a53774f4c73cb90f278d26094cce765720' target="_blank">View Collection</Button>
              <Button as="a" size='M' variant="PRIMARY" href='...' target="_blank" disabled>Select Portal</Button>
            </Card>
          </Grid>

      </Stack>
    </>
  );
}

export default Portals;
