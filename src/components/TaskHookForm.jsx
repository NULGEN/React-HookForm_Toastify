import React from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      people: [],
    },
    mode: 'all',
  });

  const onSubmit = (data) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: 'yapılacak',
    });
    reset();
  };

  return (
    <div>
      <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-line">
          <label className="input-label" htmlFor="title">
            Başlık
          </label>
          <input
            className="input-text"
            id="title"
            {...register('title', {
              required: 'Task başlığı yazmalısınız',
              minLength: {
                value: 3,
                message: 'Task başlığı en az 3 karakter olmalı',
              },
            })}
          />
          <p className="input-error">{errors.title?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label" htmlFor="description">
            Açıklama
          </label>
          <textarea
            className="input-textarea"
            rows="3"
            id="description"
            {...register('description', {
              required: 'Task açıklaması yazmalısınız',
              minLength: {
                value: 10,
                message: 'Task açıklaması en az 10 karakter olmalı',
              },
            })}
          ></textarea>
          <p className="input-error">{errors.description?.message}</p>
        </div>

        <div className="form-line">
          <label className="input-label">İnsanlar</label>
          <div>
            {kisiler.map((p) => (
              <label className="input-checkbox" key={p}>
                <input
                  type="checkbox"
                  value={p}
                  {...register('people', {
                    validate: {
                      minLength: (value) =>
                        value.length >= 1 || 'Lütfen en az bir kişi seçin',
                      maxLength: (value) =>
                        value.length <= 3 || 'En fazla 3 kişi seçebilirsiniz',
                    },
                  })}
                />
                {p}
              </label>
            ))}
          </div>
          <p className="input-error">{errors.people?.message}</p>
        </div>

        <div className="form-line">
          <button className="submit-button" type="submit">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
