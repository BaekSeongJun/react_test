package com.hi.mallapi.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import net.coobird.thumbnailator.Thumbnails;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
@RequiredArgsConstructor
public class CustomFileUtil {
	@Value("${upload.path}")
	private String uploadPath;

	//생성자가 발생한 후에 나를 불러서 실행해줘
	@PostConstruct
	public void init() {
		File tempFolder = new File(uploadPath);
		if (!tempFolder.exists()){
			tempFolder.mkdirs();
		}

		//절대경로
		uploadPath = tempFolder.getAbsolutePath();
	}

	public List<String> saveFiles(List<MultipartFile> files) throws RuntimeException {
		//List<MultipartFile> files 내용 유무 체크
		if (files == null || files.size() == 0) {
			return null;
		}
		//업로드 될 파일명들을 저장 리스트
		List<String> uploadNames = new ArrayList<>();
		//업로드된 파일 => UUID_파일명변환 => 임시저장된 파일을 복사해서 붙여넣기
		//UUID_파일명을 List<String>에 저장
		for (MultipartFile multipartFile : files) {
			String savedName = UUID.randomUUID().toString() + "_" +
				multipartFile.getOriginalFilename();
			Path savePath = Paths.get(uploadPath, savedName);
			try {
				Files.copy(multipartFile.getInputStream(), savePath);
				//받는 파일이 이미지인지 체크
				String contentType = multipartFile.getContentType();
				if(contentType != null && contentType.startsWith("image")) {
					//섬네일 이미지를 생성한다.
					Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);
					//원본 이미지를 => 400,400으로 변경 => c://uplad//s_UUID_cat.jpg
					Thumbnails.of(savePath.toFile()).size(400, 400).toFile(thumbnailPath.toFile());
				}
				uploadNames.add(savedName);
			} catch (IOException e) {
				throw new RuntimeException(e.getMessage());
			}
		} // end for
		return uploadNames;
	}
}
