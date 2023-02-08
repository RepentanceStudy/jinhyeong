import styled from '@emotion/styled';

export const ContentStyle = styled('div')(({}) => ({
   maxWidth: 480,
   margin: 'auto',
   minHeight: '100vh',
   display: 'flex',
   justifyContent: 'center',
   flexDirection: 'column',
   padding: 5,
}));

export const From = styled('form')(() => ({
   container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      alignItems: 'center',
   },
}));
