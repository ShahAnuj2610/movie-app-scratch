import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  ${({ alignItems }) => alignItems
    && css`
      align-items: ${alignItems};
    `};
  ${({ justifyContent }) => justifyContent
    && css`
      justify-content: ${justifyContent};
    `};
`;

export default Flex;
