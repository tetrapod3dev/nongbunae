package com.ssafy.IoTBackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.IoTBackend.model.User;
import com.ssafy.IoTBackend.model.calendar.Calendar;
import com.ssafy.IoTBackend.service.CalendarService;
import com.ssafy.IoTBackend.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@ApiResponses({ @ApiResponse(code = 200, message = "OK"),
		@ApiResponse(code = 201, message = "Created"),
		@ApiResponse(code = 400, message = "Bad Request"),
		@ApiResponse(code = 401, message = "Unauthorized"),
		@ApiResponse(code = 403, message = "Forbidden"),
        @ApiResponse(code = 404, message = "Not Found") })
@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/calendar")
@Api(value = "재배 일정")
public class CalendarController {

	public static final String SUCCESS = "success";
	public static final String FAIL = "fail";
	
	@Autowired
	private CalendarService calendarService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	@ApiOperation(value = "유저의 전체 재배 일정 목록 조회", 
		notes = "유저의 재배 일정 리스트 반환")
	public ResponseEntity<Object> selectCalendars(Authentication authentication) {
		String userId = authentication.getPrincipal().toString();
		List<Calendar> calendars = null;
		try {
			User user = userService.selectUser(userId);
			if(user != null) {				
				calendars = calendarService.selectCalendar(userId);
				return new ResponseEntity<>(calendars, HttpStatus.OK);
			}else {
				return new ResponseEntity<>("유효하지 않은 인증 토큰입니다.", HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(calendars, HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping
	@ApiOperation(value = "수확하기 전 재배 일정 중단", notes = "성공시 'success' 실패시 'fail' 반환")
	public ResponseEntity<String> stopCalendar(@RequestParam Integer calendar_id) {
		try {
			calendarService.stopCalendar(calendar_id);
			return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(FAIL, HttpStatus.BAD_REQUEST);
		}
	}

}