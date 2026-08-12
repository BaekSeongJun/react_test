package com.hi.mallapi.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hi.mallapi.domain.Todo;
import com.hi.mallapi.dto.PageRequestDTO;
import com.hi.mallapi.dto.PageResponseDTO;
import com.hi.mallapi.dto.TodoDTO;
import com.hi.mallapi.repository.TodoRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

	private final ModelMapper modelMapper;
	private final TodoRepository todoRepository;

	@Override
	public Long insert(TodoDTO todoDTO){
		log.info("============TodoServiceImpl insert============");
		Todo todo = modelMapper.map(todoDTO, Todo.class);
		Todo savedTodo = todoRepository.save(todo);

		return savedTodo.getTno();
	}

	@Override
	public TodoDTO select(Long tno) {
		java.util.Optional<Todo> result = todoRepository.findById(tno);
		Todo todo = result.orElseThrow();
		TodoDTO dto = modelMapper.map(todo, TodoDTO.class);
		return dto;
	}

	@Override
	public void update(TodoDTO todoDTO) {
		Optional<Todo> result = todoRepository.findById(todoDTO.getTno());
		Todo todo = result.orElseThrow();
		todo.changeTitle(todoDTO.getTitle());
		todo.changeDueDate(todoDTO.getDueDate());
		todo.changeComplete(todoDTO.isComplete());
		todoRepository.save(todo);
	}
	@Override
	public void delete(Long tno){
		todoRepository.deleteById(tno);
	}

	@Override
	public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO){
		Pageable pageable = PageRequest.of(
			pageRequestDTO.getPage() - 1, // 1 페이지가 0 이므로 주의
			pageRequestDTO.getSize(), Sort.by("tno").descending());
		Page<Todo> result = todoRepository.findAll(pageable);
		List<TodoDTO> dtoList = result.getContent().stream().map(todo ->
			modelMapper.map(todo, TodoDTO.class)).collect(Collectors.toList());
		long totalCount = result.getTotalElements();
		PageResponseDTO<TodoDTO> responseDTO = PageResponseDTO.<TodoDTO>withAll()
			.dtoList(dtoList).pageRequestDTO(pageRequestDTO).totalCount(totalCount).build();
		return responseDTO;
	}
}
