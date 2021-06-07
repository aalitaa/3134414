const config = require("./config");
const jointocreatemap = new Map();
module.exports = function (client) {
    const description = {//lrowsxrd
        name: "jointocreate",
        filename: "jointocreate.js",//lrowsxrd
        version: "3.2"
    }
//MODÜLLER YÜKLENDİĞİNDE LOGA DÜŞEN MESAJ
    console.log(` Lrows Sayesinde Modüller Yüklendi !:: ⬜️ Module: ${description.name} | Loaded version ${description.version} from ("${description.filename}")`)
//SESTEN ÇIKIP ÇIKMADIĞINI ANLAYAN KOMUT
    client.on("voiceStateUpdate", (oldState, newState) => {//lrowsxrd
  // KANAL ADI AYARLAMA LROWS
  //HATA VERİYOR GİBİ GÖZÜKÜYOR ANCAK ÇALIŞIYOR
  let oldparentname = "unknown"
  let oldchannelname = "unknown"
  let oldchanelid = "unknown"
  if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
  if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name//lrowsxrd
  if (oldState && oldState.channelID) oldchanelid = oldState.channelID
  let newparentname = "unknown"
  let newchannelname = "unknown"//lrowsxrd
  let newchanelid = "unknown"
  if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
  if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
  if (newState && newState.channelID) newchanelid = newState.channelID
  if (oldState.channelID) {
      if (typeof oldState.channel.parent !== "unknown")  oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
       else  oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`//lrowsxrd
  }
  if (newState.channelID) {
      if (typeof newState.channel.parent !== "unknown") newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
      else newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`//lrowsxrd
  }
  // GİRİŞ YAPTI V12 by Lrows
  if (!oldState.channelID && newState.channelID) {
    if(newState.channelID !== config.JOINTOCREATECHANNEL) return;  //lrowsxrd
    jointocreatechannel(newState);   //load the function
  }
  // ÇIKIŞ YAPTI V12 by Lrows
  if (oldState.channelID && !newState.channelID) {//lrowsxrd
            //özel oda sistemi
          if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
            //guild oluştur
            var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
            //if the channel size is below one
            if (vc.members.size < 1) { 
              //dünyadan sil tamamen
              jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`); //lrowsxrd
              //oda silinme logu
              console.log(" :: " + oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Room wurde gelöscht")
              //kişi odadan çıktığında odayı sil
              return vc.delete(); //lrowsxrd
          }
            else {
            }
          }
  }
  // Oda Değiştirme v12 by Lrows
  if (oldState.channelID && newState.channelID) {//lrowsxrd
  
    if (oldState.channelID !== newState.channelID) {//lrowsxrd
      //if its the join to create channel
      if(newState.channelID===config.JOINTOCREATECHANNEL) 
      //yeni oda kur
      jointocreatechannel(oldState);  
      //
      if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
        //lrowsxrd
        var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
        //lrowsxrd
        if (vc.members.size < 1) { //lrowsxrd
          //delete it from the map
          jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`); 
         //oda sil logu
          console.log(" :: " + oldState.member.user.username + "#" + oldState.member.user.discriminator + " :: Room wurde gelöscht")
        //oda sil
          return vc.delete(); 
      }
      else {
      }
      }
    }
}//lrowsxrd
  })
    async function jointocreatechannel(user) {
      //log 
      console.log(" :: " + user.member.user.username + "#" + user.member.user.discriminator + " :: Oda Oluşturuldu")
      //lrowsxrd
      await user.guild.channels.create(`${user.member.user.username} Oda`, {
        type: 'voice',
        parent: "770717918279237663", //ODAYI OLUŞTURACAĞI KATEGORİ IDSI
      }).then(async vc => {
        //kişiyi odaya taşı
        user.setChannel(vc);
        //yeni komut atar
        jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
        //odanın iznini değiştirir
        await vc.overwritePermissions([
          {
            id: user.id,
            allow: ['MANAGE_CHANNELS'],
          },
          {
            id: user.guild.id,
            allow: ['VIEW_CHANNEL'],
          },
        ]);
      })
    }
}
//lrowsxrd
