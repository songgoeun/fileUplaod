import styled from 'styled-components';

export interface TypoProps {
  color?: string;
}

export const H1M = styled.h1<TypoProps>`
  font-family: 'Noto_Sans_KR Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 38px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const H2M = styled.h2<TypoProps>`
  font-family: 'Noto_Sans_KR Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const H3M = styled.h3<TypoProps>`
  font-family: 'Noto_Sans_KR Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const H3R = styled.h3<TypoProps>`
  font-family: 'Noto_Sans_KR';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const H4B = styled.h4<TypoProps>`
  font-family: 'Noto_Sans_KR Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const H4M = styled.h4<TypoProps>`
  font-family: 'Noto_Sans_KR Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const H5R = styled.h5<TypoProps>`
  font-family: 'Noto_Sans_KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const H5M = styled.h5<TypoProps>`
  font-family: 'Noto_Sans_KR Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const H5B = styled.h5<TypoProps>`
  font-family: 'Noto_Sans_KR Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const BR = styled.div<TypoProps>`
  font-family: 'Noto_Sans_KR';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const BM = styled.div<TypoProps>`
  font-family: 'Noto_Sans_KR Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const BB = styled.div<TypoProps>`
  font-family: 'Noto_Sans_KR Bold';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const F1 = styled.div<TypoProps>`
  font-family: 'Noto_Sans_KR';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const F2 = styled.div<TypoProps>`
  font-family: 'Noto_Sans_KR Light';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;

export const C1 = styled.div<TypoProps>`
  font-family: 'Noto_Sans_KR';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  color: ${({ color }) => color ?? 'rgba(0, 0, 0, 0.85)'};
`;
