import {Course} from "../model/course";
import {sortCoursesBySeqNo} from "./sort-course-by-seq";

describe('Sort Course by Sequence', () => {
  const course1 = {
    id: 8,
    titles: {
      description: 'Angular Advanced Library Laboratory: Build Your Own Library',
      longDescription: 'Learn Advanced Angular functionality typically used in Library Development. Advanced Components, Directives, Testing, Npm'
    },
    iconUrl: 'https://angular-academy.s3.amazonaws.com/thumbnails/advanced_angular-small-v3.png',
    courseListIcon: 'https://angular-academy.s3.amazonaws.com/thumbnails/angular-advanced-lesson-icon.png',
    category: 'ADVANCED',
    seqNo: 8,
    url: 'angular-advanced-course'
  } as any as Course

  const course2 = {
    id: 6,
    titles: {
      description: 'Angular Security Course - Web Security Fundamentals',
      longDescription: 'Learn Web Security Fundamentals and apply them to defend an Angular / Node Application from multiple types of attacks.'
    },
    iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png',
    courseListIcon: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/lock-v2.png',
    category: 'ADVANCED',
    lessonsCount: 11,
    seqNo: 6,
    url: 'angular-security-course'
  } as any as Course;

  const course3 = {
    id: 7,
    titles: {
      description: 'Angular PWA - Progressive Web Apps Course',
      longDescription: 'Learn Angular Progressive Web Applications, build the future of the Web Today.'
    },
    iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png',
    courseListIcon: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/alien.png',
    category: 'ADVANCED',
    lessonsCount: 8,
    seqNo: 6,
    url: 'angular-pwa-course'
  } as any as Course;

  it('should return positive when course1 sequence number is greater than course2', () => {
    expect(sortCoursesBySeqNo(course1, course2)).toBeGreaterThan(0);
  });

  it('should return negative when course1 sequence number is greater than course2', () => {
    expect(sortCoursesBySeqNo(course2, course1)).toBeLessThan(0);
  });

  it('should return zero when course1 sequence number is equal to course2', () => {
    expect(sortCoursesBySeqNo(course2, course3)).toBe(0);
  });
})
