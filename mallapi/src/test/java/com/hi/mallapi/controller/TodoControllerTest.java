package com.hi.mallapi.controller;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.hi.mallapi.dto.PageRequestDTO;
import com.hi.mallapi.dto.PageResponseDTO;
import com.hi.mallapi.dto.TodoDTO;
import com.hi.mallapi.service.TodoService;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
public class TodoControllerTest {
	@Autowired
	private TodoService todoService;
	@Test
	public void testRegister() {
		TodoDTO todoDTO = TodoDTO.builder()
			.title("서비스 테스트")
			.writer("tester")
			.dueDate(LocalDate.of(2023, 11, 20))
			.build();
		Long tno = todoService.insert(todoDTO);
		log.info("TNO: " + tno);
	}
	@Test
	public void testSelect() {
		Long tno = 101L;
		TodoDTO todoDTO = todoService.select(tno);
		log.info(todoDTO);
	}

	@Test
	public void testUpdate() {
		TodoDTO todoDTO = TodoDTO.builder()
			.tno(101L)
			.title("서비스 테스트 수정")
			.writer("testet수정")
			.dueDate(LocalDate.of(2023, 11, 20))
			.build();

		todoService.update(todoDTO);
		log.info("수정이완료되었음");
	}

	@Test
	public void testDelete() {
		Long tno = 101L;
		todoService.delete(tno);
		log.info("삭제가 완료되었음");
	}

	@Test
	public void testList() {
		PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(2).size(10).build();
		PageResponseDTO<TodoDTO> response = todoService.list(pageRequestDTO);
		log.info(response);
	}
}
