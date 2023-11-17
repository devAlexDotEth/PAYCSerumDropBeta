import { FC } from 'react';
import Button from '../components/button';
import Twitter from '../components/icons/twitter';
import Stack from '../components/stack';
import Youtube from '../components/icons/youtube';
import Discord from '../components/icons/discord';
import background from '../assets/contact/background.png';
import Heading from '../components/heading';

export const Portals: FC<{}> = () => {

  const Contact = `Contact`;

  return (
    <>

      {/* Contact background */}
      <Stack 
        direction='VERTICAL' 
        localStyles={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 0%), rgb(0 0 0 / 10%)), url('${background}')`,
          backgroundPosition: 'center left',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          width: '100vw',
          padding: 'var(--scale-48)',
          marginTop: 86, 
          marginBottom: 50,
          '@media (min-width: 800px)': { 
            padding: 'var(--scale-72)',
          }
        }}>

          <Stack
            direction="VERTICAL"
            space={'var(--scale-36)'} 
            localStyles={{
              alignItems: 'center',
              '@media (min-width: 600px)': { 
                alignItems: 'start',
              }
            }}>

              {/* Desktop Heading */}
              <Heading 
                level="1"
                localStyles={{
                  display: 'none', 
                  '@media (min-width: 600px)' :{
                    display: 'block'
                  },
                }}
              >
                {Contact}
              </Heading>

              {/* Mobile Heading */}
              <Heading 
                level="3"
                localStyles={{
                  display: 'block', 
                  '@media (min-width: 600px)' :{
                    display: 'none'
                  },
                }}
              >
                {Contact}
              </Heading>

              {/* Actions */}
              <Stack 
                direction="VERTICAL" 
                space={'var(--scale-24)'}
                localStyles={{ 
                  alignItems: 'stretch',
                  '@media (min-width: 600px)': { 
                    alignItems: 'start',
                  }
                }}
              >
                <Button as="a" size='M' variant='SECONDARY' href="https://discord.com/invite/SXayyRHar2" target="_blank" before={<Discord theme="LIGHT" size="L" />}>Discord</Button>
                <Button as="a" size='M' variant='SECONDARY' href="https://twitter.com/PepeApeYC" target="_blank" before={<Twitter theme="LIGHT" size="L" />}>Twitter</Button>
                <Button as="a" size='M' variant='SECONDARY' href="https://www.youtube.com/@pepeapeyachtclub2584" target="_blank" before={<Youtube theme="LIGHT" size="L" />}>Youtube</Button>
              </Stack>
          </Stack>

      </Stack>
    </>
  );
}

export default Portals;
