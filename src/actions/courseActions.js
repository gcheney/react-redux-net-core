import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function getCoursesSuccess(courses) {
	return { type: types.GET_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
	return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
	return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function getCourses() {
	return function(dispatch) {
		dispatch(beginAjaxCall());
		return courseApi.getCourses()
			.then(courses => {
				dispatch(getCoursesSuccess(courses));
			}).catch(error => {
				throw(error);
			});
	};
}

export function saveCourse(course) {
	return function (dispatch) {
		dispatch(beginAjaxCall());
		return courseApi.saveCourse(course).then(savedCourse => {
			course.id ? dispatch(updateCourseSuccess(savedCourse))
			: dispatch(createCourseSuccess(savedCourse));
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);
		});
	};
}