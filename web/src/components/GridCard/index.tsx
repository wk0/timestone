import { Fragment} from 'react';
import { Box, ButtonBase, Card, CardMedia, CardContent, Grid } from '@mui/material';

const GridCard = (props: any) => {

  const { stone } = props;

  if (!stone) {
    return null;
  }

  return (
    <Fragment>
      <Grid
        item
        xl={4}
        lg={4}
        md={4}
        sm={4}
        xs={12}
      >
        <Box>
          <ButtonBase style={{ width: '100%', borderRadius: '8px' }}>
            <Card elevation={20} style={{ position: 'relative', borderRadius: '16px', width: '100%' }}>
              <CardMedia
                sx={{
                  height: 240,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    cursor: 'pointer',
                    opacity: 0.35,
                  }
                }}
              >
                <picture>
                  <img src={stone.image_url} alt="media" style={{ height: '240px', width: '100%' }} />
                </picture>
              </CardMedia>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  paddingBottom: '10px !important',
                  minHeight: '40px',
                }}
              >
                <div style={{ display: 'block', textAlign: 'left', textOverflow: 'ellipsis', wordWrap: 'break-word', overflow: 'hidden', maxHeight: '2.6em', lineHeight: '1.8em', fontSize: '14px', fontFamily: 'Plus Jakarta Sans' }}>
                  {stone.capture_url}
                </div>
              </CardContent>
            </Card>
          </ButtonBase>
        </Box>
      </Grid>
    </Fragment>
  );
};

export default GridCard;