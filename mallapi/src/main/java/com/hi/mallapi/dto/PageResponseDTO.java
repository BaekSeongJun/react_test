package com.hi.mallapi.dto;


import lombok.Builder;
import lombok.Data;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<E> {
	private List<E> dtoList; 				//List<TodoDTO>	[게시판에 보여줄 10개 레코드 객체]
	private List<Integer> pageNumList; 		//List<Integer>	:페이지 번호 [1,2,3,4,5,6,...10]
	private PageRequestDTO pageRequestDTO; 	//요청한 페이지 정보, 한 페이지 보여줄 레코드 수
	private boolean prev; 					// 앞 페이지 존재 유무
	private boolean next;					// 뒤 페이지 존재 유무
	private int totalCount;					//전체 레코드 수
	private int prevPage;
	private int nextPage;
	private int totalPage;					//전체 페이지
	private int current;					//현재 페이지

	// PageResponseDTO.builder() 대신 PageResponseDTO.withAll() 라는 이름으로 빌더를 사용
	@Builder(builderMethodName = "withAll")
	public PageResponseDTO(List<E> dtoList, PageRequestDTO pageRequestDTO, long
		totalCount) {
		this.dtoList = dtoList;
		this.pageRequestDTO =pageRequestDTO;
		this.totalCount = (int) totalCount;
		int end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;
		int start = end - 9;
		int last =(int)(Math.ceil((totalCount /(double)pageRequestDTO.getSize())));
		end = end > last ? last : end;
		this.prev = start > 1;
		this.next = totalCount > end * pageRequestDTO.getSize();
		// start =1, end= 10,  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  List<Integer> 만들어낸다.
		this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());
		if (prev){
			this.prevPage = start - 1;
		}
		if (next){
			this.nextPage = end + 1;
		}
		this.totalPage = this.pageNumList.size();
		this.current = pageRequestDTO.getPage();
	}
}
