// Step4UserInfo.jsx
import { useEffect, useState } from "react";
import Icon from '../common/Icon';

export default function Step4UserInfo({ formData, setFormData }) {
  const [askUserData, setAskUserData] = useState(formData.askUserData || false);
  const [userDataFields, setUserDataFields] = useState(
    formData.userDataFields || [{ id: 1, placeholder: '', type: 'text' }]
  );

  // Update parent form data when local state changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      askUserData,
      userDataFields
    }));
  }, [askUserData, userDataFields]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify({
      ...formData,
      askUserData,
      userDataFields
    }));
  }, [askUserData, userDataFields, formData]);

  const addField = () => {
    if (userDataFields.length >= 4) return;
    
    const newField = {
      id: Date.now(),
      placeholder: '',
      type: 'text'
    };
    
    setUserDataFields(prev => [...prev, newField]);
  };

  const updateField = (id, field, value) => {
    setUserDataFields(prev => 
      prev.map(fieldObj => 
        fieldObj.id === id 
          ? { ...fieldObj, [field]: value }
          : fieldObj
      )
    );
  };

  const deleteField = (id) => {
    if (userDataFields.length === 1) {
      // Keep at least one field when toggled on
      setUserDataFields([{ id: Date.now(), placeholder: '', type: 'text' }]);
      return;
    }
    
    setUserDataFields(prev => prev.filter(field => field.id !== id));
  };

  const handleAskUserDataToggle = (checked) => {
    setAskUserData(checked);
    
    if (checked && userDataFields.length === 0) {
      // Add first field when toggling on
      setUserDataFields([{ id: 1, placeholder: '', type: 'text' }]);
    } else if (!checked) {
      // Clear fields when toggling off
      setUserDataFields([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Title */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
          <Icon name="user" className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Respondent Information
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Optional - Collect additional information from respondents
          </p>
        </div>
      </div>

      {/* Main Toggle Section */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Ask for Respondent Information
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Collect additional details from respondents. Only you (the question creator) will see this information.
            </p>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={askUserData}
              onChange={(e) => handleAskUserDataToggle(e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-12 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Privacy Note */}
        {!askUserData && 
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="shield" className="text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">Privacy Notice</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-400 mt-1 space-y-1">
                <li>• Only the Username of respondents will be visible to everyone</li>
                <li>• The data you asked is visible only to you (question creator)</li>
                <li>• Respondents must input the info before the can proceed to the main questions</li>
                <li>• Not necessary to ask user for addition data, only if you need it</li>
              </ul>
            </div>
          </div>
        </div>}
      </div>

      {/* Data Fields Section - Conditionally shown */}
      {askUserData && (
        <div className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 transition-all duration-300 ${askUserData ? 'opacity-100' : 'opacity-50'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Information Fields
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Add up to 4 fields. Enter placeholder text that respondents will see.
              </p>
            </div>
            
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {userDataFields.length}/4 fields
            </div>
          </div>

          {/* Fields List */}
          <div className="space-y-4">
            {userDataFields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Field {index + 1}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={field.placeholder}
                      onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500"
                      placeholder="e.g., School/University Name, Phone Number, etc."
                      required
                    />
                    
                    {field.placeholder && (
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        Respondents will see: "{field.placeholder}"
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Delete Button - Show if more than 1 field */}
                {userDataFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteField(field.id)}
                    className="mt-8 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete field"
                  >
                    <Icon name="trash-2" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add More Button */}
          {userDataFields.length < 4 && (
            <button
              type="button"
              onClick={addField}
              className="w-full mt-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl py-3 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all font-semibold"
            >
              <Icon name="plus" />
              Add Another Field
            </button>
          )}

          {/* Field Validation Warning */}
          {userDataFields.some(field => !field.placeholder.trim()) && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="alert-circle" className="text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm text-yellow-700 dark:text-yellow-300">
                  Please add placeholder text for all fields before proceeding
                </span>
              </div>
            </div>
          )}

          {/* Max Fields Message */}
          {userDataFields.length >= 4 && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="info" className="text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Maximum of 4 fields reached. Respondents prefer shorter forms.
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Preview Section */}
      {askUserData && userDataFields.some(field => field.placeholder.trim()) && (
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Preview for Respondents
          </h3>
          
          <div className="space-y-4 max-w-md">
            {userDataFields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {field.placeholder || `Field ${index + 1}`}
                </label>
                <input
                  type="text"
                  disabled
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                  placeholder={field.placeholder || "Placeholder text..."}
                />
              </div>
            ))}
            
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-4">
              This is how the fields will appear to respondents
            </div>
          </div>
        </div>
      )}
    </div>
  );
}