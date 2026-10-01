import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { X, Plus, Trash2, Save, RotateCcw } from 'lucide-react';
import { defaultResumeData } from '../../data/defaultResume';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onSave: (newData: ResumeData) => void;
}

export const EditResumeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  data,
  onSave
}) => {
  const [formData, setFormData] = useState<ResumeData>(data);
  const [newSkill, setNewSkill] = useState('');

  if (!isOpen) return null;

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }));
    setNewSkill('');
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleReset = () => {
    setFormData(defaultResumeData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
          <div>
            <h2 className="text-base font-bold text-white">
              Редактирование информации резюме
            </h2>
            <p className="text-xs text-slate-400">
              Измените контактные данные, желаемую зарплату, навыки или описание
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          {/* Photo management */}
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {formData.photoUrl ? (
                <img
                  src={formData.photoUrl}
                  alt={formData.name}
                  className="w-14 h-14 rounded-lg object-cover border border-slate-700 shadow"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                  Нет фото
                </div>
              )}
              <div>
                <div className="font-semibold text-white text-xs">Фотография для резюме</div>
                <div className="text-[11px] text-slate-400">
                  {formData.showPhoto ? 'Отображается на резюме' : 'Скрыта в настройках'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="cursor-pointer px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 text-xs font-medium transition-colors">
                <span>Загрузить фото</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        if (result) {
                          setFormData((prev) => ({
                            ...prev,
                            photoUrl: result,
                            showPhoto: true
                          }));
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, showPhoto: !prev.showPhoto }))}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  formData.showPhoto
                    ? 'border-indigo-500/80 text-indigo-300 bg-indigo-950/40'
                    : 'border-slate-800 text-slate-500 bg-slate-900'
                }`}
              >
                {formData.showPhoto ? 'Скрыть' : 'Показать'}
              </button>
            </div>
          </div>

          {/* Main info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">ФИО</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Должность / Желаемая позиция</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Город</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Формат работы</label>
              <input
                type="text"
                value={formData.workFormat}
                onChange={(e) => setFormData({ ...formData, workFormat: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Телефон</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Ожидания по зарплате</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">О себе (Summary)</label>
            <textarea
              rows={4}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Skills Editor */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Ключевые навыки</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Добавить навык (например: Postman, Charles, SQL, Jira)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Добавить</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 p-3 bg-slate-950 rounded-xl border border-slate-800/80 max-h-36 overflow-y-auto">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-slate-800 text-slate-200 px-2.5 py-1 rounded-md text-xs border border-slate-700"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 py-2 px-3 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить к оригиналу</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Сохранить изменения</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
