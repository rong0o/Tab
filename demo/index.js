(function() {
  const $ = window;
  const opts = {
    tabType: "bottom",
    tabWidthType: "fix",
    tabWidth: "150px",
    dispIndex: 0,
    tabId: "tab1",
    slider: true,
    onActive: function(current, prev) {
      console.log("onActive " + current + " " + prev);
    }
  };
  var tab = new $.Tab(opts);

  //Tab 嵌套demo
  
  // const opts2 = {
  //   tabType: "bottom",
  //   stretch: true,
  //   dispIndex: 2,
  //   tabId: "tab2",
  //   tabWidthType: "auto",
  //   slider: true
  // };
  // var tab2 = new $.Tab(opts2);
})();
