import { supabase } from "../lib/supabase";

export const useStorage = {

  async upload(bucket,token,tarFile, store){
    if (!tarFile) return null;
    // ファイル名をエンコード
    //const timestamp = Date.now();
    const fileExt = tarFile.name.split('.').pop(); // 拡張子を取得
    
    // 安全なファイル名を生成
    const safeFileName = `group_img_${token}.${fileExt}`;
    
    try{
      const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`${token}/${safeFileName}`, tarFile, {
        cacheControl: '3600', //キャッシュ時間の設定
        upsert: true //上書きする
      })
      console.log(data)
      if (error){throw error}
      
      //テーブルの更新
      const params = {img_url: data.path}
      console.log(params)
      await supabase.from('groups').update(params).eq('token',token);

      //storeの更新
      store.$patch({details: params})
      
      return data
    }catch(err){
      console.log(err)
    }
  },

  async getUrl(bucket,imgPath){
    console.log("GetUrl",bucket,imgPath)
    if(!imgPath){
        return "";
    }
    try{
      const { data, error } = supabase.storage.from(bucket).getPublicUrl(imgPath);
      if(error) throw error
      console.log(data)
      return data.publicUrl
    }catch(er){
      console.log(er)
    }

  }
}