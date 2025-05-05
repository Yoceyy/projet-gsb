import React from 'react';

const MenuTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="menu-ajout-rapport">
            <button
                className={activeTab === 'ajouter' ? 'active-tab' : ''}
                onClick={() => setActiveTab('ajouter')}
            >
                Ajouter un rapport
            </button>
            <button
                className={activeTab === 'modifier' ? 'active-tab' : ''}
                onClick={() => setActiveTab('modifier')}
            >
                Modifier un rapport
            </button>
        </div>
    );
};

export default MenuTabs;
