package com.hi.mallapi.controller;


import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hi.mallapi.dto.ProductDTO;
import com.hi.mallapi.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
public class ProductController {
	private final CustomFileUtil fileUtil;

	@PostMapping("/api/products")
	public Map<String, String> register(ProductDTO productDTO) {
		log.info("rgister: " + productDTO);
		List<MultipartFile> files = productDTO.getFiles();
		//업로드된 파일 => UUID_파일명 => copy => List<UUID_파일명>
		List<String> uploadFileNames = fileUtil.saveFiles(files);
		productDTO.setUploadFileNames(uploadFileNames);
		log.info(uploadFileNames);
		return Map.of("RESULT", "SUCCESS");
	}
}
