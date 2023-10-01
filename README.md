# 날씨어때(How's the weather?)

## 🔷 Description

A web site that provides weather status.

## 🔷 URL

- Web Site: https://jiyaho.github.io/react-how_is_the_weather
- Github Repository: https://github.com/Jiyaho/react-how_is_the_weather

## 🔷 Purpose

- 급격한 날씨 변화가 있는 경우 사용자는 날씨의 수치적 데이터(기온, 바람 세기, 습도 등)만 보고 날씨를 가늠하기 어려운 경우가 많습니다. 따라서 이러한 날씨 데이터를 통해 상태 메시지 등을 제공하여 사용자에게 실시간으로 날씨에 대한 대비, 외출 전 옷차림 등에 도움을 주고자 기획하게 되었습니다.

## 🔷 Page Description

### Main Page

- One Page로 이루어진 실시간 날씨 데이터 제공 웹 사이트입니다.
- 사용자 접속 위치를 파악하여 날씨 데이터를 제공합니다.
- 사용자 접속 시간 및 기후에 따라 배경 동영상이 달라집니다.

<img src="https://i.ibb.co/M16KFn4/pc1.png" alt="pc1" border="0" loading="lazy" />
<img src="https://i.ibb.co/W3hW6Fw/pc2.png" alt="pc2" border="0" loading="lazy" />
<img src="https://i.ibb.co/257yxNN/pc4.png" alt="pc4" border="0" loading="lazy" />

### Mobile 접속

모바일 접속 시 구동 화면입니다.

<img src="https://i.ibb.co/9bGzXBC/mobile1.png" alt="mobile1" width="70%" border="0" loading="lazy" />

## 🔷 Features Available on this Web Site

- 사용자의 Geolocation 데이터를 통해, 유저가 접속한 위치의 실시간 날씨 현황 제공.
- 오늘 날짜, 현재 시각, 현재 위치, 실시간 기온, 체감 온도, 바람 속도, 최저 및 최고 기온, 습도 등.
- 최저 및 최고 기온의 경우, 현재 위치(도시)의 평균 최저/최대 기온을 선택적으로 나타낸 매개 변수이므로 데이터는 참고적으로 보시기 바랍니다.

## 🔷 Used Skills

<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" style={{ margin: '2px' }} />
  <img
    src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"
    style={{ margin: '2px' }}
  />
  <img
    src="https://img.shields.io/badge/CSS Modules-000000?style=for-the-badge&logo=CSS Modules&logoColor=white"
    style={{ margin: '2px' }}
  />
</div>

## 🔷 Additional Function

- 반응형 웹을 지원합니다.

<img src="https://i.ibb.co/dG5GZnk/pc-mobile.png" alt="pc-mobile" border="0" width="200px" />

## 🔷 Trouble Shooting - **모바일에서 Video 요소 자동 재생 옵션 미적용 문제** - 문제점: video 태그가 PC 웹에서는 정상작동 하나, 모바일에서는

백그라운드로 자동 재생이 안 되는 문제 발생하였습니다. - 원인: 안드로이드 기종의 경우에는 `autoPlay` 속성만으로도 정상 작동한다고 하나,
IOS에서는 `playsInline` 속성이 추가적으로 필요하였습니다. - 해결: video 태그에 `autoPlay` 외에도 playsInline 속성을 추가하여 해결하였습니다.{' '}

## 🔷 File Tree Structure

```
📦 react-how_is_the_weather
├─.gitignore
├─README.md
├─package-lock.json
├─package.json
├─public
└─ src
   ├─ App.js
   ├─ components
   │  ├─ Background.js
   │  ├─ ConvertCoordinate.js
   │  ├─ Footer.js
   │  ├─ Header.js
   │  └─ WeatherApi.js
   ├─ css
   │  └─ App.module.css
   ├─ index.js
   └─ routes
      └─ Main.js
```

## 🔷 Used API

- OpenWeather Current weather data
  - https://openweathermap.org/current
