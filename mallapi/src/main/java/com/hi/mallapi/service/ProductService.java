package com.hi.mallapi.service;

import org.springframework.transaction.annotation.Transactional;

import com.hi.mallapi.dto.PageRequestDTO;
import com.hi.mallapi.dto.PageResponseDTO;
import com.hi.mallapi.dto.ProductDTO;

@Transactional
public interface ProductService {
	PageResponseDTO<ProductDTO> selectList(PageRequestDTO pageRequestDTO);
}
