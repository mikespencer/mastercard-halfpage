/*global Modernizr, ActiveXObject*/
var wpAd = window.wpAd || {};

(function(win, doc, wpAd){

  'use strict';

  wpAd.mastercard = {
    addPixel : function(){
      if(wpAd.mastercardVars.videoPixel){
        var i = doc.createElement("img");
        i.src = wpAd.mastercardVars.videoPixel.replace('[timestamp]',Math.floor(Math.random()*1E10));
        i.height = "1";
        i.width = "1";
        i.style.display = "none";
        doc.getElementById('halfpage-ad-mastercard-video').appendChild(i);
      }
    },
    flashVer : function() {
      var i,a,o,p,s="Shockwave",f="Flash",t=" 2.0",u=s+" "+f,v=s+f+".",rSW=new RegExp("^"+u+" (\\d+)");if((o=navigator.plugins)&&(p=o[u]||o[u+t])&&(a=p.description.match(rSW)))return a[1];else if(!!(win.ActiveXObject))for(i=10;i>0;i--)try{if(!!(new ActiveXObject(v+v+i)))return i;}catch(e){}return 0;
    },
    init : function(){
      var container = doc.getElementById('halfpage-ad-mastercard-video'),
              video = 'http://videoads.washingtonpost.com/'+wpAd.mastercardVars.videoName,
              poster = wpAd.mastercardVars.posterURL;
      if(container){
        if(Modernizr.video && Modernizr.video.h264 === 'probably'){
          //html5 video support
          var v = doc.createElement('video');
          v.id = 'mastercard-HTML5player';
          v.src  =  video + '.mp4';
          v.width =  '324';
          v.controls = 'true';
          v.preload  =  'metadata';
          v.poster  =  poster;
          container.appendChild(v);
          container.style.height = '182px';
          try{
            v.addEventListener('play', function(){
              wpAd.mastercard.addPixel();
            }, false);
            v.addEventListener('pause', function(){
              wpAd.mastercard.addPixel();
            }, false);
            v.addEventListener('volumechange', function(){
              wpAd.mastercard.addPixel();
            }, false);
          } catch(e){}
        } else if (wpAd.mastercard.flashVer() >=9) {
          //flash video support
          var flashVars = 'source='+video+'.f4v&mute=false&autoplay=false&preload=false&poster='+poster,
          flashWidth = '324',
          flashHeight = '182',
          flashSWF = 'http://media.washingtonpost.com/wp-adv/advertisers/mastercard/2012/03/halfpage/VidPlayer.swf',
          swfDiv = doc.createElement('div');
          swfDiv.innerHTML = '<object type="application/x-shockwave-flash" data="'+flashSWF+'" width="' + flashWidth + '" height="' + flashHeight + '" id="mastercard-SWFplayer" name="mastercard-SWFplayer" style="outline:none;"><param name="movie" value="'+flashSWF+'" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="scale" value="noscale " /><param name="menu" value="true" /><param name="devicefont" value="false" /><param name="allowScriptAccess" value="always" /><param name="flashVars" value="'+flashVars+'" /></object>';
          container.appendChild(swfDiv);
          container.style.height = '182px';
        } else {
          //no video support
          container.style.display = 'none';
        }
      }
    }
  };

  wpAd.mastercard.init();

})(window, document, wpAd);