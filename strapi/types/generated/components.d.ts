import type { Schema, Struct } from '@strapi/strapi';

export interface CoursesLesson extends Struct.ComponentSchema {
  collectionName: 'components_courses_lessons';
  info: {
    displayName: 'Lesson';
  };
  attributes: {
    text_content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['video', 'text']>;
    video_content: Schema.Attribute.Media<'videos'>;
  };
}

export interface CoursesQuiz extends Struct.ComponentSchema {
  collectionName: 'components_courses_quizzes';
  info: {
    displayName: 'Quiz';
  };
  attributes: {
    options: Schema.Attribute.Component<'courses.quiz-option', true>;
    question: Schema.Attribute.Text & Schema.Attribute.Required;
    question_image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CoursesQuizOption extends Struct.ComponentSchema {
  collectionName: 'components_courses_quiz_options';
  info: {
    displayName: 'Quiz Option';
    icon: 'command';
  };
  attributes: {
    answer_type: Schema.Attribute.Enumeration<['text', 'number', 'media']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
    explanation: Schema.Attribute.Text;
    is_correct_answer: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    media_answer: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    number_answer: Schema.Attribute.Decimal & Schema.Attribute.Required;
    text_answer: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProfileAcademicExperience extends Struct.ComponentSchema {
  collectionName: 'components_profile_academic_experiences';
  info: {
    displayName: 'Academic Experience';
  };
  attributes: {
    course_or_major: Schema.Attribute.String;
    degree_level: Schema.Attribute.Enumeration<
      [
        'High School Diploma',
        'Vocational/Technical Degree',
        "Associate's Degree",
        "Bachelor's Degree",
        "Master's Degree",
        'Doctorate (Ph.D.)',
        'Other',
      ]
    >;
    degree_status: Schema.Attribute.Enumeration<['Completed', 'In Progress']>;
    end_date: Schema.Attribute.Date;
    institution: Schema.Attribute.String;
    start_date: Schema.Attribute.Date;
  };
}

export interface ProfileProfessionalExperience extends Struct.ComponentSchema {
  collectionName: 'components_profile_professional_experiences';
  info: {
    displayName: 'Professional Experience';
  };
  attributes: {
    company: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    end_date: Schema.Attribute.Date;
    is_current_job: Schema.Attribute.Boolean;
    role: Schema.Attribute.String;
    start_date: Schema.Attribute.Date;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'courses.lesson': CoursesLesson;
      'courses.quiz': CoursesQuiz;
      'courses.quiz-option': CoursesQuizOption;
      'profile.academic-experience': ProfileAcademicExperience;
      'profile.professional-experience': ProfileProfessionalExperience;
      'shared.media': SharedMedia;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
