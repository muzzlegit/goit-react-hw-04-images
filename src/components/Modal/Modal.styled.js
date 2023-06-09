import styled from '@emotion/styled';

export const Backdrop = styled.div({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,.5)',
});
export const Content = styled.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  backgroundColor: 'white',
});
