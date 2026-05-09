"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function AvatarUpload({ url, size = 128, onUpload }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (file) => {
    try {
      setUploading(true);

      // 현재 로그인한 유저 정보 가져오기
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user?.id) {
        alert("사용자 정보를 가져올 수 없습니다.");
        setUploading(false);
        return;
      }

      const userId = authData.user.id;

      // 파일 확장자 추출
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;

      // Supabase Storage에 업로드
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) {
        alert(`업로드 실패: ${uploadError.message}`);
        setUploading(false);
        return;
      }

      // 공개 URL 획득
      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData?.publicUrl;

      if (publicUrl) {
        // 부모 컴포넌트에 URL 전달
        onUpload(publicUrl);
      }

      setUploading(false);
    } catch (error) {
      alert(`예상치 못한 오류: ${error.message}`);
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={handleAvatarClick}
        className={`relative cursor-pointer rounded-full overflow-hidden transition-all ${
          uploading ? "opacity-50" : "hover:opacity-80"
        }`}
        style={{ width: size, height: size }}
      >
        {url ? (
          <img
            src={url}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
      </div>

      {uploading && <p className="text-sm text-muted-foreground">업로드 중...</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />

      <p className="text-xs text-muted-foreground text-center">
        이미지를 클릭하여 프로필 사진을 업로드하세요.
      </p>
    </div>
  );
}
