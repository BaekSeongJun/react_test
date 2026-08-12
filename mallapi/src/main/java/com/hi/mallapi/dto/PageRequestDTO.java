package com.hi.mallapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
//상속 관계 전체에 걸쳐 builder를 연결한다.
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PageRequestDTO {
	@Builder.Default
	private int page= 1;
	@Builder.Default
	private int size = 10;
}