import React from 'react';

function Footer() {
  // const openUrlInNewWindow = () => {
  //   const newWindow = window.open('https://www.springdigital.com.au', '_blank', 'width=600,height=400');
  //   if (newWindow) {
  //     newWindow.moveTo(0, 0);
  //     newWindow.resizeTo(window.screen.availWidth, window.screen.availHeight);
  //   }
  // };
  return (
    <div className="footer">
      <div className="footerText">{`Powered by ViPR`}</div>
    </div>
  );
}

export default Footer;
